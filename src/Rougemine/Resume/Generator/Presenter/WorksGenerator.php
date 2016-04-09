<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\Works;
use Rougemine\Resume\Model\ValueObject\Work;
use Symfony\Component\Yaml\Yaml;

class WorksGenerator
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
     * @return Works
     */
    public function getWorks($language)
    {
        $worksYamlFile = str_replace('${language}', $language, $this->dataFilePath);
        $worksYamlFileContent = file_get_contents($worksYamlFile);
        $worksRawData = Yaml::parse($worksYamlFileContent);

        $works = array_map([$this, 'getWorkFromRawYamlData'], $worksRawData);

        return new Works(
            $works
        );
    }

    /**
     * @param array $yamlData
     *
     * @return Work
     */
    private function getWorkFromRawYamlData(array $yamlData)
    {
        return new Work(
            $yamlData['title'],
            $yamlData['content']
        );
    }
}
