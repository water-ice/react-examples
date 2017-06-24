// ajax 
import net from '@home/utils/net';
import API_ROOT from '@home/constants/apiRoot';
import {DEV_WITH_PHP} from '@home/constants/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

