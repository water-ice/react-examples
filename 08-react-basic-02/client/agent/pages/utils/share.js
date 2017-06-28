import net from '@agent/utils/net';
import API_ROOT from '@agent/constants/apiRoot';
import { shareFn } from '@common/js/utils/share';
export const setShare = shareFn(net, "agent", API_ROOT);
