import type { Job } from "../types/job";

export function getStatusCounts(jobs: Job[]) {
  const result = {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };

  jobs.forEach((job) => {
    result[job.status]++;
  });

  return result;
}

export function getInterviewRate(jobs: Job[]) {
    const result = getStatusCounts(jobs);

    if(!jobs.length) return 0;

    return (result.interview + result.offer) / jobs.length * 100;
}

export function getAverageSalary(jobs: Job[]) {
    if(!jobs.length) return 0;

    return jobs.reduce((acc, job) => acc + job.salary, 0)/jobs.length;
}

export function getTopLocation(jobs: Job[]) {
    if (!jobs.length) return '';

    const locationCounts: Record<string, number> = {};

    for(const job of jobs) {
        if(locationCounts[job.location]) {
           locationCounts[job.location] += 1;
        }  else {
            locationCounts[job.location] = 1;
        }
    }

    const entries = Object.entries(locationCounts);

    let topLocation = '';
    let maxCount = 0;

    for (const [location, count] of entries) {
        if(count > maxCount) {
            maxCount = count;
            topLocation = location;
        }
    }

    return topLocation;
}
