// ajax 
import net from '@utils/agent/net';
import API_ROOT from '@constants/agent/apiRoot';
import {DEV_WITH_PHP} from '@constants/agent/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

