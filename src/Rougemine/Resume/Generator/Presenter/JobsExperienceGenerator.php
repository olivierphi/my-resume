<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\JobsExperiences;
use Rougemine\Resume\Model\ValueObject\JobExperience;
use Symfony\Component\Yaml\Yaml;

class JobsExperienceGenerator
{
    /**
     * @var string
     */
    private $dataFilePath;

    /**
     * @param string $dataFilePath
     */
    public function __construct(
        $dataFilePath
    ) {
        $this->dataFilePath = $dataFilePath;
    }

    /**
     * @return JobsExperiences
     */
    public function getJobsExperience($language)
    {
        $jobsExperiencesYamlFile = str_replace('${language}', $language, $this->dataFilePath);
        $jobsExperiencesYamlFileContent = file_get_contents($jobsExperiencesYamlFile);
        $jobsExperiencesRawData = Yaml::parse($jobsExperiencesYamlFileContent);

        $jobsExperiences = array_map([$this, 'getJobExperienceFromRawYamlData'], $jobsExperiencesRawData);

        return new JobsExperiences(
            $jobsExperiences
        );
    }

    /**
     * @param array $yamlData
     *
     * @return JobExperience
     */
    private function getJobExperienceFromRawYamlData(array $yamlData)
    {
        return new JobExperience(
            $yamlData['period'],
            $yamlData['content']
        );
    }
}
