import { changeTheme } from "../redux"
import { CHANGE_THEME } from "../redux/youtube/types"
import * as actions from '../redux/youtube/action'

describe('action testing',() => {
    test('changeTheme test',() => {
        const theme = 'light'
        const type = CHANGE_THEME
        const output = {
            type:type,
            payload: {
                theme:theme
            }
        }
        expect(changeTheme(theme)).toEqual(output)
    })
})