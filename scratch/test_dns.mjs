import dns from 'dns/promises';

try {
  const res = await dns.lookup('www.cloverbuxstore.com');
  console.log('Lookup result for www:', res);
} catch (e) {
  console.log('Lookup error:', e.message);
}
