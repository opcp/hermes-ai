import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import credential from "../module/Credential/credential";
import { useHistory } from "react-router";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function MemberOrder() {

  const history = useHistory();
  if (!credential.user) {
    history.push("/");
    return null
  }



  return (
    <>
      <section className="memberContainer">
        <div className="memberBody">
        <h2>會員訂單</h2>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "訂單", field: "ID" },
                { title: "方案", field: "plan" },
                { title: "數量", field: "point" },
                { title: "狀態", field: "status" },
                { title: "訂單時間", field: "createTime", type: "datetime" },
              ]}
              data={[
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
                {
                  ID: "order_1",
                  plan: "prime",
                  point: 20,
                  status: 63,
                  createTime: "2021/03/29 14:00:32",
                },
                {
                  ID: "order_2",
                  plan: "normal",
                  point: 15,
                  status: 90,
                  createTime: "2021/03/30 09:00:32",
                },
              ]}
              title=""
              localization={{
                toolbar: {
                  searchTooltip: "搜尋",
                },
                pagination: {
                  labelRowsSelect: "列",
                  firstTooltip: "首頁",
                  previousTooltip: "上一頁",
                  nextTooltip: "下一頁",
                  lastTooltip: "最後頁",
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default MemberOrder;
