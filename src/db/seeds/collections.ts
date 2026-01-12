import { db } from '@/db';
import { collections, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    // Get the first user from the database
    const firstUser = await db.select().from(user).limit(1);
    
    if (!firstUser || firstUser.length === 0) {
        throw new Error('No users found in database. Please seed users first.');
    }
    
    const userId = firstUser[0].id;
    
    // Calculate date helpers
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const oneHourAgo = new Date(now);
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const sampleCollections = [
        {
            userId: userId,
            dustbinId: 4,
            scheduledDate: tomorrow.toISOString().split('T')[0],
            completedDate: null,
            status: 'scheduled',
            notes: 'Urgent: Bin is full',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        },
        {
            userId: userId,
            dustbinId: 1,
            scheduledDate: tomorrow.toISOString().split('T')[0],
            completedDate: null,
            status: 'scheduled',
            notes: 'High priority pickup',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        },
        {
            userId: userId,
            dustbinId: 2,
            scheduledDate: yesterday.toISOString().split('T')[0],
            completedDate: yesterday.toISOString().split('T')[0],
            status: 'completed',
            notes: 'Routine collection',
            createdAt: twoDaysAgo.toISOString(),
            updatedAt: twoDaysAgo.toISOString(),
        },
        {
            userId: userId,
            dustbinId: 5,
            scheduledDate: now.toISOString().split('T')[0],
            completedDate: null,
            status: 'in_progress',
            notes: 'Collection in progress',
            createdAt: oneHourAgo.toISOString(),
            updatedAt: now.toISOString(),
        },
    ];

    await db.insert(collections).values(sampleCollections);
    
    console.log('✅ Collections seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});