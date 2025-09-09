import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/lib/firebaseAdmin';
import cloudinary from '@/lib/cloudinary'; // ✅ use your custom config
import formidable from 'formidable';


// Required to disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const form = formidable({ multiples: false });

  await new Promise((resolve, reject) => {
  form.parse(req, async (err, fields, files) => {
    if (err) return reject(err);
    
      let logoUrl = '';
      if (files.logo) {
        const uploadResult = await cloudinary.uploader.upload(files.logo.filepath, {
          folder: 'company_logos',
        });
        logoUrl = uploadResult.secure_url;
      }

      // Save company profile
      await db.collection('users').doc(user.id).set(
        {
          companyName: fields.companyName,
          website: fields.website,
          location: fields.location,
          logo: logoUrl,
          updatedAt: Date.now(),
        },
        { merge: true }
      );

      // Save job to "jobs" collection
      await db.collection('jobs').add({
        jobTitle: fields.jobTitle,
        jobDescription: fields.jobDescription,
        requirements: fields.requirements,
        location: fields.location,
        workerType: fields.workerType || '',
        companyName: fields.companyName,
        website: fields.website,
        logo: logoUrl,
        createdAt: Date.now(),
        postedBy: user.id,
      });

      resolve(true);
    });
  });

  return new Response('Job posted', { status: 200 });
}
