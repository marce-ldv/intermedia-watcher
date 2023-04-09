import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'intermedia-watcher',

  projectId: '6fyyl8sn',
  dataset: 'user',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
