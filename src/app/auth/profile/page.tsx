import { getProfile } from '../../../lib/api';
import { redirect } from 'next/navigation';
import SignoutButton from './SignoutButton';

export default async function ProfilePage() {
  try {
    const profile = await getProfile();
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Bio:</strong> {profile.bio || 'No bio'}</p>
        <p><strong>Avatar URL:</strong> {profile.avatar_url || 'No avatar'}</p>
        <SignoutButton />
      </div>
    );
  } catch (error) {
    console.log(`${error}`)
    redirect('/auth/signin');
  }
}