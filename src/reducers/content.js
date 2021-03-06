import { Map, fromJS } from 'immutable'

const initialState = {
  published: Map({}),
  session: Map({}),
  uploads: {}
}

export default function content (state = initialState, action) {
  switch (action.type) {
    case 'SET':
      const path = action.path.split('/')

      return {
        ...state,
        session: state.session.updateIn(path, () => (
          fromJS(action.value))
        )
      }

    case 'SET_FILE_UPLOAD':
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.key]: {
            files: action.files,
            preview: action.preview
          }
        }
      }

    case 'DISCARD':
      return {
        ...state,
        session: state.published,
        uploads: {}
      }

    case 'RELEASE_SUCCESS':
      return {
        ...state,
        published: state.session,
        uploads: {}
      }
  }

  return state
}
