import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'https://ithelp.ithome.com.tw/articles/10358917';

const proxies = [
  '109.195.113.65:8080',
  '191.102.248.5:8085',
  '193.233.84.77:1080',
  '202.154.19.7:8080',
  '115.127.98.18:58080',
  '152.32.77.213:8095',
  '114.130.153.46:58080',
  '157.66.85.32:8080',
  '103.105.55.207:8999',
  '27.147.175.115:8080',
  '131.100.51.161:999',
  '101.255.165.217:8080',
  '68.178.168.41:80',
  '89.221.215.128:80',
  '202.61.204.51:80',
  '211.251.236.253:80',
  '202.6.233.133:80',
  '178.128.200.87:80',
  '51.195.40.90:80',
  '209.97.150.167:3128',
  '155.94.241.132:3128',
  '146.59.202.70:80',
  '67.43.228.254:2679',
  '211.234.125.3:443',
  '103.189.250.89:8090',
  '103.178.42.29:8181',
  '14.142.36.210:1111',
  '103.175.240.87:8080',
  '113.192.31.5:1111',
  '191.37.4.218:8085',
  '103.231.239.137:58080',
  '177.93.46.187:999',
  '186.180.66.138:8080',
  '185.49.96.36:8080',
  '134.209.29.120:3128',
  '188.166.197.129:3128',
  '67.43.236.22:22079',
  '67.43.236.20:10145'
];

const userAgents = [
  // Desktop browsers
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",

  // Mobile browsers
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",

  // Older browser versions
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1",

  // Less common browsers
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.277",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Vivaldi/4.0",

  // Bots and crawlers (use with caution)
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",

  // Game consoles
  "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.5.10 NintendoBrowser/5.1.0.13343",
  "Mozilla/5.0 (PlayStation 4 3.11) AppleWebKit/537.73 (KHTML, like Gecko)",

  // Smart TVs
  "Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/2.4.0 TV Safari/538.1",
  "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.34 Safari/537.36 WebAppManager"
];


export const options = {
  scenarios: {
    ramp_up_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2s', target: 5 },
      ],
    },
  },
};

export default function () {
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  const proxy = proxies[Math.floor(Math.random() * proxies.length)];


  const params = {
    headers: {
      'User-Agent': userAgent,
    },
    proxy: proxy,
  };

  const res = http.get(BASE_URL, params);

  check(res, { 'status is 200': (r) => r.status === 200 });

  sleep(0.5);  // Simulate a pause between requests
}