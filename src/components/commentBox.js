import React from 'react';

function CommentBox(props) {
  return (
    <table className="comment-add-form-table">
      <tbody>
        <tr>
          <th>writer</th>
          <td><span>{props.data.userid}</span></td>
        </tr>
        <tr>
          <th>title</th>
          <td><input type="text" name="title" value={props.data.title} onChange={props.onChange}/></td>
        </tr>
        <tr>
          <th>email</th>
          <td><input type="text" name="email" value={props.data.email} onChange={props.onChange}/></td>
        </tr>
        <tr>
          <th>content</th>
          <td><textarea type="text" name="content"  value={props.data.content} onChange={props.onChange}/></td>
        </tr>
      </tbody>
    </table>
  );
}

export default CommentBox