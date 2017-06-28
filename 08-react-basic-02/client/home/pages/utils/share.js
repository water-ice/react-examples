import net from '@home/utils/net';
import API_ROOT from '@home/constants/apiRoot';
import { shareFn } from '@common/js/utils/share';
export const setShare = shareFn(net, "home", API_ROOT);
