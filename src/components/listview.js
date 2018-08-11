import React from 'react';
import { connect } from 'react-redux';
import Griddle, {RowDefinition, ColumnDefinition} from 'griddle-react';

const LocalPlugin = require('griddle-react').plugins.LocalPlugin;
const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};
const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});

function ListView(props) {
  const styleConfig = {
    styles: {
      Table: { width: "100%", heigh: "200px"},
      Row: {textAlign: "center"}
    }
  }
  const CustomTitle = ({value, rowData}) => {
    return <input className="listview-title" type="button" name="update" value={value} onClick={() => props.btnHandler('update', rowData)}/>
  }
  return (
    <Griddle data={props.data} plugins={[LocalPlugin]} styleConfig={styleConfig} showSettings={false}>
      <RowDefinition>
        <ColumnDefinition id="no" title="No" />
        <ColumnDefinition id="name" title="글쓴이" />
        <ColumnDefinition id="time" title="등록시간" />
        <ColumnDefinition id="title" title="title" width={600} customComponent={enhancedWithRowData(CustomTitle)} />
      </RowDefinition>
    </Griddle>
  );
}

export default ListView