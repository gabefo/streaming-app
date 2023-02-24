import { HTMLAttributes, forwardRef, useEffect, useMemo, useRef } from 'react'

import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { Icon } from '@iconify/react'
import { Portal } from '@radix-ui/react-portal'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'

import buildImageURL from '@tmdb/buildImageURL'
import { mediaRoutes } from '@tmdb/routes'
import type { SearchMultipleResult } from '@tmdb/types'

import { AutocompletePlugin, useAutocomplete } from '@hooks/useAutocomplete'
import useDebouncedFetch from '@hooks/useDebouncedFetch'

import { CSS } from 'stitches.config'

import Box from './Box'
import Chip from './Chip'
import Divider from './Divider'
import Flex from './Flex'
import IconButton from './IconButton'
import InputBase from './InputBase'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from './List'
import LoadingSpinner from './LoadingSpinner'
import ScrollArea from './ScrollArea'
import Text from './Text'

function useSuggestionsPlugin() {
  const { locale } = useRouter()

  const debouncedFetch = useDebouncedFetch(300)

  const plugin = useMemo<AutocompletePlugin<SearchMultipleResult>>(
    () => ({
      async getSources({ query, setQuery, refresh, state }) {
        if (!query) {
          return []
        }

        try {
          const response = await debouncedFetch(
            `/api/tmdb/search/${
              state.context.filter ?? 'multi'
            }?language=${locale}&query=${encodeURIComponent(query)}`
          )

          if (!response.ok) {
            return []
          }

          const data = await response.json()

          const results = (
            state.context.filter
              ? data.results.map((item: any) => {
                  item.media_type = state.context.filter
                  return item
                })
              : data.results
          ) as SearchMultipleResult[]

          return [
            {
              sourceId: 'suggestionsPlugin',
              getItems() {
                return results
              },
              getItemInputValue({ item }) {
                return item.media_type === 'movie' ? item.title : item.name
              },
              getItemUrl({ item }) {
                return `${mediaRoutes[item.media_type]}/details/${item.id}`
              },
              templates: {
                item({ item }) {
                  const mediaType = item.media_type
                  const title = mediaType === 'movie' ? item.title : item.name
                  const imagePath = mediaType === 'person' ? item.profile_path : item.poster_path

                  return (
                    <ListItemButton as={Link} href={`${mediaRoutes[mediaType]}/details/${item.id}`}>
                      {imagePath ? (
                        <ListItemAvatar>
                          <Image
                            alt="poster"
                            src={buildImageURL(imagePath, 'w92')}
                            width={32}
                            height={48}
                            style={{ marginLeft: -4, borderRadius: 4, objectFit: 'cover' }}
                          />
                        </ListItemAvatar>
                      ) : (
                        <ListItemIcon>
                          <Icon icon="mdi:search" />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={title}
                        secondary={
                          mediaType === 'movie'
                            ? `${item.release_date.slice(0, 4)} film`
                            : mediaType === 'tv'
                            ? 'Television series'
                            : item.known_for_department
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            setQuery(title)
                            refresh()
                          }}
                        >
                          <Icon icon="material-symbols:arrow-insert" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  )
                },
              },
            },
          ]
        } catch {
          return []
        }
      },
    }),
    [debouncedFetch, locale]
  )

  return plugin
}

type SearchbarProps = {
  css?: CSS
  detached?: boolean
}

export default function Searchbar({ detached = false, ...props }: SearchbarProps) {
  const router = useRouter()

  const { t } = useTranslation()

  const recentSearchesPlugin = useMemo(
    () =>
      createLocalStorageRecentSearchesPlugin({
        key: 'searchHistory',
        limit: 5,
        transformSource({ source, onTapAhead }) {
          return {
            ...source,
            getItemUrl({ item }) {
              return `/search?q=${item.label}`
            },
            templates: {
              item({ item }) {
                return (
                  <ListItemButton as={Link} href={`/search?q=${item.label}`}>
                    <ListItemIcon>
                      <Icon icon="mdi:history" />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="small"
                        edge="end"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          onTapAhead(item)
                        }}
                      >
                        <Icon icon="material-symbols:arrow-insert" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                )
              },
            },
          }
        },
      }),
    []
  )

  const suggestionsPlugin = useSuggestionsPlugin()

  const plugins = [recentSearchesPlugin, suggestionsPlugin] as Array<AutocompletePlugin<any, any>>

  const { autocomplete, state } = useAutocomplete({
    id: 'search',
    openOnFocus: true,
    shouldPanelOpen() {
      return true
    },
    onSubmit({ state }) {
      router.push({ pathname: '/search', query: { q: state.query } })
    },
    onStateChange({ state, prevState }) {
      // Scroll to the top of the panel whenever the query changes
      if (state.query !== prevState.query) {
        const scrollContent = panelRef.current?.querySelector('[data-scroll-content="true"]')
        if (scrollContent) {
          scrollContent.scrollTop = 0
        }
      }
    },
    navigator: {
      navigate({ itemUrl }) {
        router.push(itemUrl)
      },
    },
    plugins,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { getEnvironmentProps } = autocomplete
  const isModalOpen = detached && state.isOpen
  const hasResults =
    state.collections.length > 0 &&
    state.collections.some((collection) => collection.items.length > 0)

  useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return
    }

    const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    })

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [getEnvironmentProps, state.isOpen])

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus()
    }
  }, [isModalOpen])

  useEffect(() => {
    if (detached) {
      return
    }

    const form = formRef.current
    const panel = panelRef.current

    if (!form || !panel) {
      return
    }

    const handleResize = () => {
      const formRect = form.getBoundingClientRect()
      panel.style.top = `${formRect.bottom}px`
      panel.style.right = `${
        document.documentElement.clientWidth - formRect.left - formRect.width
      }px`
      panel.style.left = `${formRect.left}px`
      panel.style.maxHeight = `${document.documentElement.clientHeight - formRect.bottom - 32}px`
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [detached, state.isOpen])

  useEffect(() => {
    if (router.isReady && router.pathname === '/search' && router.query.q) {
      autocomplete.setQuery(router.query.q.toString())
      autocomplete.refresh()
    }
  }, [autocomplete, router.isReady, router.pathname, router.query.q])

  const setFilter = (value: string) => {
    const prevValue = state.context.filter
    autocomplete.setContext({
      filter: prevValue !== value ? value : null,
    })
    autocomplete.refresh()
  }

  const renderContent = (
    <>
      <Flex
        as="form"
        ref={formRef}
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        css={
          detached
            ? {
                height: 56,
                flexShrink: 0,
              }
            : {
                height: 48,
                borderRadius: state.isOpen ? '8px 8px 0 0' : 8,
                bg: state.isOpen ? '$panel' : '$input',
                boxShadow: state.isOpen ? '0 4px 4px rgba(0, 0, 0, 0.5)' : 'none',
                pointerEvents: 'auto',
              }
        }
      >
        {detached ? (
          <IconButton
            type="button"
            size="large"
            css={{ position: 'absolute', top: 4, left: 4 }}
            onTouchStart={(event) => {
              event.preventDefault()
            }}
            onClick={() => {
              autocomplete.setIsOpen(false)
            }}
          >
            <Icon icon="mdi:arrow-left" />
          </IconButton>
        ) : (
          <Box
            {...autocomplete.getLabelProps({})}
            as="label"
            css={{
              position: 'absolute',
              top: 'calc(50% - 12px)',
              left: 16,
              display: 'flex',
              fontSize: 24,
              color: '$textDisabled',
            }}
          >
            <Icon icon="mdi:search" />
          </Box>
        )}
        <InputBase
          ref={inputRef}
          {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          placeholder={t('search.placeholder')}
          css={{ flex: 1, pl: 56, pr: 48 }}
        />
        {state.query ? (
          <Box css={{ position: 'absolute', top: 'calc(50% - 20px)', right: 8 }}>
            <IconButton type="reset">
              <Icon icon="mdi:close" />
            </IconButton>
          </Box>
        ) : null}
      </Flex>

      {state.isOpen && (
        <Panel ref={panelRef} detached={detached} {...autocomplete.getPanelProps({})}>
          <Divider css={{ mx: 16 }} />
          <Flex
            align="center"
            css={{
              height: detached ? 56 : 48,
              px: 16,
              gap: 8,
              flexShrink: 0,
            }}
          >
            <Chip selected={state.context.filter === 'movie'} onClick={() => setFilter('movie')}>
              Movies
            </Chip>
            <Chip selected={state.context.filter === 'tv'} onClick={() => setFilter('tv')}>
              Shows
            </Chip>
            <Chip selected={state.context.filter === 'person'} onClick={() => setFilter('person')}>
              People
            </Chip>
          </Flex>
          {state.status === 'idle' ? (
            <ScrollArea>
              {hasResults ? (
                <Box css={{ pb: 8 }}>
                  {state.collections.map(({ source, items }, sourceIndex) => (
                    <section key={sourceIndex}>
                      {items.length > 0 && (
                        <List {...autocomplete.getListProps()} dense={!detached}>
                          {items.map((item, itemIndex) => {
                            return (
                              <ListItem
                                key={itemIndex}
                                {...autocomplete.getItemProps({ item, source })}
                                css={{
                                  '&[aria-selected="true"], &:active': {
                                    bg: '$hover',
                                  },
                                  [`& ${ListItemButton}`]: {
                                    bg: 'transparent !important',
                                  },
                                }}
                              >
                                {source.templates.item({ item, state })}
                              </ListItem>
                            )
                          })}
                        </List>
                      )}
                    </section>
                  ))}
                </Box>
              ) : (
                <Box css={{ py: 16, px: 24 }}>
                  <Text color="secondary">
                    {state.query ? `No results for "${state.query}"` : 'No recent searches'}
                  </Text>
                </Box>
              )}
            </ScrollArea>
          ) : (
            <Flex align="center" justify="center" css={{ height: 56 }}>
              <LoadingSpinner />
            </Flex>
          )}
        </Panel>
      )}
    </>
  )

  return (
    <Box {...autocomplete.getRootProps({})} {...props}>
      {detached ? (
        <>
          <IconButton size="large" onClick={() => autocomplete.setIsOpen(true)}>
            <Icon icon="mdi:search" />
          </IconButton>
          {isModalOpen && (
            <Portal asChild>
              <RemoveScroll allowPinchZoom forwardProps>
                <Box
                  onMouseDown={(event) => {
                    event.stopPropagation()
                  }}
                  css={{
                    position: 'fixed',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    bg: '$panel',
                    overflow: 'hidden',
                    zIndex: 9999,
                  }}
                >
                  {renderContent}
                </Box>
              </RemoveScroll>
            </Portal>
          )}
        </>
      ) : (
        renderContent
      )}
    </Box>
  )
}

const Panel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { detached: boolean }>(
  ({ children, detached, ...props }, forwardedRef) => {
    if (detached) {
      return (
        <Box
          {...props}
          ref={forwardedRef}
          css={{
            position: 'relative',
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      )
    }

    return (
      <Portal asChild>
        <Box
          {...props}
          ref={forwardedRef}
          css={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            bg: '$panel',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Portal>
    )
  }
)
