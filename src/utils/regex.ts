// Abc123DEF
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// 13 numbers
export const WHATSAPP_PATTERN = /^\d{13}$/

// 99.9 7,60 100 12345,67
export const DECIMAL_PATTERN = /^\d+(?:[\.,]\d{1,2})?$/