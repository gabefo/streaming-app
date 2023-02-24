import { Icon } from '@iconify/react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/Dialog'
import IconButton from '@components/IconButton'
import { List } from '@components/List'

import SettingsLanguage from './SettingsLanguage'
import SettingsTheme from './SettingsTheme'

export default function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton size="large">
          <Icon icon="mdi:cog" />
        </IconButton>
      </DialogTrigger>
      <DialogContent variant="fullscreen">
        <DialogHeader>
          <DialogClose asChild>
            <IconButton size="large" css={{ mr: 4 }}>
              <Icon icon="mdi:arrow-left" />
            </IconButton>
          </DialogClose>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <List padding>
          <SettingsLanguage />
          <SettingsTheme />
        </List>
      </DialogContent>
    </Dialog>
  )
}
