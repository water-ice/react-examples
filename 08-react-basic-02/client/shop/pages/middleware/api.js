// ajax 
import net from '@shop/utils/net';
import API_ROOT from '@shop/constants/apiRoot';
import {DEV_WITH_PHP} from '@shop/constants/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

