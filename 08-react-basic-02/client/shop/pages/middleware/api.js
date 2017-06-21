// ajax 
import net from '@utils/shop/net';
import API_ROOT from '@constants/shop/apiRoot';
import {DEV_WITH_PHP} from '@constants/shop/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

