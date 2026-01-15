import { db } from '@/db';
import { analytics, user } from '@/db/schema';

async function main() {
    // Get the first user from the database
    const users = await db.select().from(user).limit(1);
    
    if (users.length === 0) {
        throw new Error('No users found in database. Please seed users first.');
    }
    
    const firstUserId = users[0].id;
    
    // Calculate dates for the last 7 days
    const today = new Date();
    const getDaysAgo = (daysAgo: number) => {
        const date = new Date(today);
        date.setDate(date.getDate() - daysAgo);
        return date;
    };
    
    const sampleAnalytics = [
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(7).toISOString().split('T')[0],
            wasteCollectedKg: '12.5',
            fillLevelAvg: 45,
            collectionsCount: 1,
            createdAt: getDaysAgo(7).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(6).toISOString().split('T')[0],
            wasteCollectedKg: '8.3',
            fillLevelAvg: 38,
            collectionsCount: 1,
            createdAt: getDaysAgo(6).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(5).toISOString().split('T')[0],
            wasteCollectedKg: '15.7',
            fillLevelAvg: 52,
            collectionsCount: 2,
            createdAt: getDaysAgo(5).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(4).toISOString().split('T')[0],
            wasteCollectedKg: '10.2',
            fillLevelAvg: 41,
            collectionsCount: 1,
            createdAt: getDaysAgo(4).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(3).toISOString().split('T')[0],
            wasteCollectedKg: '18.9',
            fillLevelAvg: 65,
            collectionsCount: 2,
            createdAt: getDaysAgo(3).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(2).toISOString().split('T')[0],
            wasteCollectedKg: '7.5',
            fillLevelAvg: 35,
            collectionsCount: 1,
            createdAt: getDaysAgo(2).toISOString(),
        },
        {
            userId: firstUserId,
            dustbinId: 1,
            date: getDaysAgo(1).toISOString().split('T')[0],
            wasteCollectedKg: '14.1',
            fillLevelAvg: 58,
            collectionsCount: 1,
            createdAt: getDaysAgo(1).toISOString(),
        }
    ];

    await db.insert(analytics).values(sampleAnalytics);
    
    console.log('✅ Analytics seeder completed successfully - 7 days of data created');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});