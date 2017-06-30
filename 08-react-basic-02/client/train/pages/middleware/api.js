// ajax 
import net from '@train/utils/net';
import API_ROOT from '@train/constants/apiRoot';
import {DEV_WITH_PHP} from '@train/constants/constants';

import { apiFn } from '@common/js/middleware/api';
export const api = apiFn(net, API_ROOT, DEV_WITH_PHP);

