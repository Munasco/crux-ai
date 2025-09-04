#!/usr/bin/env node

// Using built-in Node.js fetch (Node.js 18+)

// Test the deployed Instagram scraper
const testScraperAPI = async () => {
    const testProfiles = [
        'instagram.com/cristiano', // Cristiano Ronaldo - very popular
        'instagram.com/selenagomez', // Selena Gomez - also popular
        'instagram.com/kyliejenner' // Kylie Jenner - popular
    ];

    console.log('🧪 Testing deployed Instagram follower scraper...\n');
    
    for (const profile of testProfiles) {
        console.log(`📊 Testing profile: ${profile}`);
        
        try {
            // You may need to get the actual API endpoint URL from Apify console
            // This is a placeholder - replace with your actual Apify API endpoint
            const apifyActorId = 'DNAdjmmIXMpBcJ9Ud'; // From your build logs
            const apiUrl = `https://api.apify.com/v2/acts/${apifyActorId}/runs`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.APIFY_API_TOKEN}`, // You'll need to set this
                },
                body: JSON.stringify({
                    profile_url: `https://${profile}`
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`✅ Successfully started run for ${profile}`);
                console.log(`   Run ID: ${result.data?.id}`);
                console.log(`   Status: ${result.data?.status}`);
            } else {
                console.log(`❌ Failed to start run for ${profile}: ${response.status} ${response.statusText}`);
            }
            
        } catch (error) {
            console.log(`❌ Error testing ${profile}: ${error.message}`);
        }
        
        console.log(''); // Empty line for readability
    }
};

// Alternative simpler test approach - we can try to get the actor info first
const getActorInfo = async () => {
    const apifyActorId = 'DNAdjmmIXMpBcJ9Ud';
    
    try {
        console.log('📋 Getting actor information...\n');
        
        const apiUrl = `https://api.apify.com/v2/acts/${apifyActorId}`;
        const response = await fetch(apiUrl);
        
        if (response.ok) {
            const actorInfo = await response.json();
            console.log('✅ Actor information retrieved:');
            console.log(`   Name: ${actorInfo.data?.name}`);
            console.log(`   Title: ${actorInfo.data?.title || 'Instagram Follower Scraper'}`);
            console.log(`   Version: ${actorInfo.data?.taggedBuilds?.latest || 'N/A'}`);
            console.log(`   Stats: ${actorInfo.data?.stats?.totalRuns || 0} total runs`);
            console.log(`   URL: https://console.apify.com/actors/${apifyActorId}`);
            
            return true;
        } else {
            console.log(`❌ Failed to get actor info: ${response.status} ${response.statusText}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Error getting actor info: ${error.message}`);
        return false;
    }
};

// Run the tests
const runTests = async () => {
    console.log('🚀 Instagram Follower Scraper - Deployment Test\n');
    console.log('════════════════════════════════════════════════\n');
    
    // First, check if we can get actor info (public endpoint, no auth needed)
    const actorInfoSuccess = await getActorInfo();
    
    if (actorInfoSuccess) {
        console.log('\n💡 To test the scraper functionality:');
        console.log('   1. Visit: https://console.apify.com/actors/DNAdjmmIXMpBcJ9Ud');
        console.log('   2. Click "Start" and enter a profile URL like: https://instagram.com/cristiano');
        console.log('   3. Check the logs to see if the browser executable error is resolved');
        console.log('   4. Verify that follower counts are extracted successfully');
    }
    
    console.log('\n✨ Next steps:');
    console.log('   - Set APIFY_API_TOKEN environment variable if you want to test via API');
    console.log('   - The Dockerfile fix should resolve the "browser executable doesn\'t exist" error');
    console.log('   - Monitor the actor runs to ensure Instagram scraping works reliably');
};

runTests().catch(console.error);
