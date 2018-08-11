import { COMMENTS_FETCH, COMMENT_ADD, COMMENT_UPDATE, COMMENT_DELETE, COMMENTS_FETCH_BY_ID } from '../constants/ActionTypes';
const initialState = {
    comments: [],
    currentComment: {}
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_FETCH:
      return {
        ...state,
        comments: action.data.data,
      };
    case COMMENT_ADD:
      return {
        ...state,
        comments: [...state.comments, action.data.data]
      };
    case COMMENT_UPDATE:
      var comments = state.comments.map(function(comment) {
        if(comment._id === action.data.data._id) {
          comment = action.data.data
        }
        return comment
      })
      return {
        ...state,
        comments: comments
      };
    case COMMENT_DELETE:
      var comments = state.comments.filter(function(comment) {
        return (comment._id !== action.data.data._id)
      })
      return {
        ...state,
        comments: comments
      };
    case COMMENTS_FETCH_BY_ID:
      return {
        ...state,
        currentComment: action.data.data
      };
    default:
      return state;
  }
}