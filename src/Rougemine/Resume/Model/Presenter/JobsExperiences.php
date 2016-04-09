<?php

namespace Rougemine\Resume\Model\Presenter;

use Rougemine\Resume\Model\ValueObject\JobExperience;

class JobsExperiences
{
    /**
     * @var JobExperience[]
     */
    private $jobsExperiences;

    /**
     * @param JobExperience[] $jobsExperiences
     */
    public function __construct(
        $jobsExperiences
    ) {
        $this->jobsExperiences = $jobsExperiences;
    }

    /**
     * @return JobExperience[]
     */
    public function getJobsExperiences()
    {
        return $this->jobsExperiences;
    }
}
