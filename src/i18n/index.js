import { createI18n } from 'vue-i18n'
import en from './en.json'
import de from './de.json'
import zhTW from './zh-TW.json'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    de,
    'zh-TW': zhTW
  }
})

export default i18n