// ajax 
import net from '@agent/utils/net';
import API_ROOT from '@agent/constants/apiRoot';
import {DEV_WITH_PHP} from '@agent/constants/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

