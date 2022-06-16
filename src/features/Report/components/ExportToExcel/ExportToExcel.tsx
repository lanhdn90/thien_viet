import Button from "antd/es/button";
import * as Excel from "exceljs";
import * as fs from "file-saver";
import * as React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { objectWidths, Program, StoreReport } from "../../../../models";
import { convertDataReport } from "../../../../utils/common";
import { selectStoreList } from "../../../Mark/StoreSlice";
export interface ExportToExcelProps {
  programs: Program[];
}

export default function ExportToExcel(props: ExportToExcelProps) {
  const stores = useAppSelector(selectStoreList);
  const { programs } = props;
  
  const exportToExcel = async () => {
    const myHeader = [
      "Id",
      "Name",
      "Address",
      "Phone",
      "Program",
      "Option",
      "Employee",
      "Registration Date",
      "Result",
    ];
    const widths = [
      { width: 5 },
      { width: 20 },
      { width: 30 },
      { width: 15 },
      { width: 30 },
      { width: 20 },
      { width: 20 },
      { width: 25 },
      { width: 20 },
    ];
    if (!stores && !programs) return;
    const arrayData = await convertDataReport(stores, programs);
    exportToExcelPro(arrayData, "Report", "Report", "Report", myHeader, widths);
  };

  const exportToExcelPro = async (
    myData: StoreReport[],
    fileName: string,
    sheetName: string,
    report: string,
    myHeader: string[],
    widths: objectWidths[]
  ) => {
    if (!myData || myData.length === 0) return;
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetName);
    const columns = myHeader?.length;
    const title = {
      border: true,
      money: false,
      height: 100,
      font: { size: 30, bold: false, color: { argb: "000000" } },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FFFFFF",
        },
      },
    };
    const header = {
      border: true,
      money: false,
      height: 70,
      font: { size: 15, bold: false, color: { argb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "0000FF",
        },
      },
    };
    const data = {
      border: true,
      money: false,
      height: 0,
      font: { size: 12, bold: false, color: { argb: "000000" } },
      alignment: null,
      fill: null,
    };
    if (widths && widths.length > 0) {
      ws.columns = widths;
    }
    let row = addRow(ws, [report], title);
    mergeCells(ws, row, 1, columns);

    addRow(ws, myHeader, header);
    myData.forEach((row) => {
      addRow(ws, Object.values(row), data);
    });

    const buf = await wb.xlsx.writeBuffer();
    fs.saveAs(new Blob([buf]),`${fileName}.xlsx`)
  };

  const addRow = (ws: Excel.Worksheet, data: string[], section: any) => {
    const row = ws.addRow(data);
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (section?.border) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
      if (section?.alignment) {
        cell.alignment = section.alignment;
      } else {
        cell.alignment = { vertical: "middle" };
      }
      if (section?.font) {
        cell.font = section.font;
      }
      if (section?.fill) {
        cell.fill = section.fill;
      }
    });
    if (section?.height > 0) {
      row.height = section.height;
    }
    return row;
  };

  const mergeCells = (
    ws: Excel.Worksheet,
    row: Excel.Row,
    from: number,
    to: number
  ) => {
    ws.mergeCells(`${row.getCell(from).address}:${row.getCell(to).address}`);
  };

  return (
    <Button size="large" type="primary" onClick={exportToExcel}>
      Export
    </Button>
  );
}
