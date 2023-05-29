// Auth
export const LOGIN_URL = '/user/login';
export const MAIN_USER_URL = '/user'
export const REGISTER_URL ="/user/register"
export const VERIFY_OPT ="/user/verifyUser"
export const CHANGE_PASSWORD="/user/changePassword"
export const RESET_PASSWORD ="/user/resetPassword"

// Dashbord
export const DASHBOARD_TOAL_URL ="/activity/getTotalAmountByActivityType"
export const REPORT_DAILY_URL = "/activity/getTotalAmountBySummaryType"
export const REPORT_WEEKLY_URL = "/activity/getTotalAmountBySummaryType"
export const REPORT_MONTHLY_URL = "/activity/getTotalAmountBySummaryType"
export const REPORT_YEARLY_URL = "/activity/getTotalAmountBySummaryType"
export const ALL_SUMMARY_TOTAL_REPORT = "/activity/getTotalAmountBySummaryType"
export const ALL_REPORT_URL = "/activity/getActivityReportSummary"

// Activity List
export const ACTIVITY_LIST_INCOME="/activity/getActivityList"
export const CREATE_INCOME_URL="/activity/createActivity"
export const UPDATE_INCOME_URL="/activity/updateActivity"
export const EXPENSE_DELETE_URL="/activity/deleteActivity"

// Management Category
export const LIST_CATEGORY_INCOME_URL="/category/getCategoryList"
export const LIST_CATEGORY_EXPENSE_URL="/category/getCategoryList"
export const CREATE_CATEGORY_INCOME_URL="/category/createCategory"
export const UPDATE_CATEGORY_INCOM_URL = "/category/updateCategory"

// Currency
export const LIST_CURRENCY_URL ="/currency/getCurrencyList"
export const CREATE_CURRENCY_URL="/usercurrency/setUpUserCurrency"

// payment method
export const LIST_PAYMENT_URL= "/paymentMethod/getPaymentMethodList"
export const CREATE_PAYMENT_UR ="/paymentMethod/createPaymentMethod"
export const UPDATE_PAYMENT = "/paymentMethod/updatePaymentMethod"
export const SEARCH_PAYMENT = "/paymentMethod/getPaymentMethod"
