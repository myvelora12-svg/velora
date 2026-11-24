try {
  const r1 = await fetch('https://www.cloverbuxstore.com');
  console.log('www status:', r1.status);
} catch (e) {
  console.log('www error:', e.message);
}

try {
  const r2 = await fetch('https://cloverbuxstore.com');
  console.log('apex status:', r2.status);
} catch (e) {
  console.log('apex error:', e.message);
}
