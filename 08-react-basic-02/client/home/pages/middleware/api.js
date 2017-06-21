// ajax 
import net from '@utils/home/net';
import API_ROOT from '@constants/home/apiRoot';
import {DEV_WITH_PHP} from '@constants/home/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

