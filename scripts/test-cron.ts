import fetch from 'node-fetch';

async function testCronJob() {
  try {
    const response = await fetch('http://localhost:3000/api/cron/reset-premium-credits', {
      method: 'POST',
      headers: {
        'x-cron-secret': process.env.CRON_SECRET || '',
      },
    });

    const data = await response.json();
    console.log('Cron job test result:', data);
  } catch (error) {
    console.error('Error testing cron job:', error);
  }
}

testCronJob();