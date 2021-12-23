/* eslint-disable import/prefer-default-export */
import { BigNumber } from 'bignumber.js';

export const floatByNum = (value: any, fixed: number = 2) => new BigNumber(value || 0).toFixed(fixed).toString();
