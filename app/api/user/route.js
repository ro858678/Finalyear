// app/api/user/route.js
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return Response.json({
    id: user.id,
    role: user.rawUserInfo?.user_roles?.[0] || 'recruiter',
  });
}
