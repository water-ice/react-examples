import net from '@train/utils/net';
import API_ROOT from '@train/constants/apiRoot';
import { shareFn } from '@common/js/utils/share';
export const setShare = shareFn(net, "agent", API_ROOT);
