import { env } from "../../env";
const config = {
  baseUrl: "https://test.erp.craftschoolship.com/jsonrpc",
  database: "bitnami_odoo",
  username: env.MA_REUSSITE_APP_USERNAME,
  password: env.MA_REUSSITE_APP_PASSWORD,
  model: {
    accountMove: "account.move",
    accountMoveLine: "account.move.line",
    attendance: "op.attendance.line",
    calendar: "calendar.event",
    calendarAttendee: "calendar.attendee",
    craftInvoice: "craft.invoice",
    craftInstallmentLines: "craft.installment.lines",
    craftSession: "craft.session",
    craftStudent: "craft.student",
    craftParentChildLine: "craft.parent.child.line",
    groups: "op.batch",
    opActivity: "op.activity",
    opCourse: "op.course",
    opParents: "op.parent",
    opSession: "op.session",
    opStudent: "op.student",
    parents: "craft.parent",
    partner: "res.partner",
    productTemplate: "product.template",
    saleOrder: "sale.order",
    teachers: "craft.teacher",
    users: "res.users",
  },
};

export default config;
