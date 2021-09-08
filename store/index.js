import { GoogleSpreadsheet } from 'google-spreadsheet'
import creds from '../config/yuuqi-bot-f41434988254.json'

export const state = () => ({
  messages: [],
  dataLoaded: false
})

export const getters = {
  messages: (state) => {
    if (!state.messages) {
      return []
    } else {
      return state.messages
    }
  },
  dataLoaded: (state) => {
    return state.dataLoaded
  }
}

export const mutations = {
  MESSAGES (state, data) {
    state.messages = data
  },
  DATA_LOADED (state, data) {
    state.dataLoaded = data
  }
}

export const actions = {
  async getMessages ({ commit }) {
    try {
      const spreadsheetId = '1B-DpIbxE23tA6q32NDIicSKJGVzFtTLlyNmM7gqJePY'
      const doc = new GoogleSpreadsheet(spreadsheetId)
      await doc.useServiceAccountAuth(creds)

      await doc.loadInfo()
      const sheet = doc.sheetsByIndex[0]
      const rows = await sheet.getRows()
      const data = await rows.map((v) => {
        return {
          darisiapa: v['Dari Siapa'],
          untuksiapa: v['Untuk Siapa'],
          pesan: v.Pesan,
          foto: v.Foto,
          kesan: v.Kesan,
          video: v.Video
        }
      })

      const finalData = data.map((v, index) => ({ ...v, index })).reverse()
      commit('MESSAGES', finalData || [])
    } catch (err) {
      commit('MESSAGES', [])
    }
  },
  setDataLoaded ({ commit }, data) {
    commit('DATA_LOADED', data)
  }
}
