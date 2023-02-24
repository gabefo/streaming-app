import React, { ReactNode } from 'react'

import {
  AutocompleteOptions as AutocompleteCoreOptions,
  AutocompleteSource as AutocompleteCoreSource,
  AutocompleteState as AutocompleteCoreState,
  AutocompletePlugin as AutocompleteCorePlugin,
  AutocompleteScopeApi,
  BaseItem,
  createAutocomplete,
  GetSourcesParams,
  InternalAutocompleteSource as InternalAutocompleteCoreSource,
} from '@algolia/autocomplete-core'

type MaybePromise<TResolution> = Promise<TResolution> | TResolution

export type Template<TParams> = (params: TParams) => ReactNode

export type SourceTemplates<TItem extends BaseItem> = {
  item: Template<{
    item: TItem
    state: AutocompleteState<TItem>
  }>
  header?: Template<{
    state: AutocompleteState<TItem>
    source: AutocompleteSource<TItem>
    items: TItem[]
  }>
  footer?: Template<{
    state: AutocompleteState<TItem>
    source: AutocompleteSource<TItem>
    items: TItem[]
  }>
  noResults?: Template<{
    state: AutocompleteState<TItem>
    source: AutocompleteSource<TItem>
  }>
}

type WithTemplates<TType, TItem extends BaseItem> = TType & {
  templates: SourceTemplates<TItem>
}

export interface AutocompleteCoreSourceWithDocs<TItem extends BaseItem>
  extends AutocompleteCoreSource<TItem> {
  sourceId: string
}

export type AutocompleteSource<TItem extends BaseItem> = WithTemplates<
  AutocompleteCoreSourceWithDocs<TItem>,
  TItem
>

export type InternalAutocompleteSource<TItem extends BaseItem> = WithTemplates<
  InternalAutocompleteCoreSource<TItem>,
  TItem
>

export type AutocompleteCollection<TItem extends BaseItem> = {
  source: InternalAutocompleteSource<TItem>
  items: TItem[]
}

export type AutocompleteState<TItem extends BaseItem> = Omit<
  AutocompleteCoreState<TItem>,
  'collections'
> & {
  collections: Array<AutocompleteCollection<TItem>>
}

export type AutocompletePlugin<TItem extends BaseItem, TData = unknown> = Omit<
  AutocompleteCorePlugin<TItem, TData>,
  'getSources'
> & {
  getSources?: GetSources<TItem>
}

export interface OnStateChangeProps<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
  state: AutocompleteState<TItem>
  prevState: AutocompleteState<TItem>
}

export type GetSources<TItem extends BaseItem> = (
  params: GetSourcesParams<TItem>
) => MaybePromise<Array<AutocompleteSource<TItem> | boolean | undefined>>

export interface AutocompleteOptions<TItem extends BaseItem>
  extends AutocompleteCoreOptions<TItem> {
  getSources?: GetSources<TItem>
  initialState?: Partial<AutocompleteState<TItem>>
  onStateChange?: (props: OnStateChangeProps<TItem>) => void
  plugins?: Array<AutocompletePlugin<any, any>>
}

export function useAutocomplete<TItem extends BaseItem>(options: AutocompleteOptions<TItem>) {
  const [state, setState] = React.useState<AutocompleteState<TItem>>(() => ({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  }))

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<TItem, React.BaseSyntheticEvent, React.MouseEvent, React.KeyboardEvent>({
        ...options,
        onStateChange(params) {
          setState(params.state as AutocompleteState<TItem>)
          options.onStateChange?.(params as OnStateChangeProps<TItem>)
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { autocomplete, state }
}
