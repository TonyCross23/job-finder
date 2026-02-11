export const calculateProfilePercentage = (user: any, profile: any, socialLinks: any[] = []) => {
  if (!user) return 0;

  const checks = [
    // 1. User Info
    !!user.username,
    !!user.email,
    !!user.profilePhoto,

    // 2. Applicant Profile Table
    !!profile?.fullName,
    !!profile?.phone,
    !!profile?.address,
    !!profile?.locationId,
    !!profile?.description,

    // 3. Lists
    (profile?.experiences?.length || 0) > 0,
    (profile?.educations?.length || 0) > 0,
    (profile?.skills?.length || 0) > 0,
    
    (socialLinks && socialLinks.length > 0) 
  ];

  const completed = checks.filter(Boolean).length;
  const total = checks.length;

  return Math.round((completed / total) * 100);
};