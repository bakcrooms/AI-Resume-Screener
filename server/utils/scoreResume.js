function scoreResume(data, keywords = [])
 {
  let score = 0;

  const defaultKeywords = ['react', 'node', 'mongodb', 'express', 'api', 'python', 'docker', 'openai'];
  const keywordList = keywords.length > 0 ? keywords : defaultKeywords;


  const skillText = (data.skills + data.summary + data.projects).toLowerCase();

  // Add points for each keyword found
  const matchedKeywords = new Set();
  keywordList.forEach(keyword => {
    if (skillText.includes(keyword)) {
      matchedKeywords.add(keyword);
      score += 1;
    }
  });

  // Experience weight
  if (data.experience && data.experience.split('\n').length > 10) {
    score += 2;
  }

  // Education bonus
  if (data.education.length > 0) {
    score += 1;
  }

  if (score > 10) score = 10;

  let verdict = '❌ Not Qualified';
  if (score >= 7) verdict = '✅ Great Candidate';
  else if (score >= 4) verdict = '⚠️ Decent but Not Ideal';

  return { score, verdict, matchedKeywords: Array.from(matchedKeywords) };
}

module.exports = scoreResume;
