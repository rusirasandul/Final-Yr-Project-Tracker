import UserProfile from '../models/UserProfile.js';

/* ── GET profile (auto-creates if none) ────────────────── */
export const getProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne();
    if (!profile) profile = await UserProfile.create({});
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── PUT upsert profile ────────────────────────────────── */
export const upsertProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne();
    if (!profile) {
      profile = await UserProfile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
