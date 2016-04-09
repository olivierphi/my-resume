<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\Technologies;
use Rougemine\Resume\Model\ValueObject\Technology;
use Symfony\Component\Yaml\Yaml;

class TechnologiesGenerator
{
    /**
     * @param string $dataFilePath
     */
    public function __construct(
        $dataFilePath
    ) {
        $this->dataFilePath = $dataFilePath;
    }

    /**
     * @return Technologies
     */
    public function getTechnologies()
    {
        $allTechnologiesYamlFileContent = file_get_contents($this->dataFilePath);
        $allTechnologiesRawData = Yaml::parse($allTechnologiesYamlFileContent);

        $mainTechnologies = array_map([$this, 'getTechnologyFromRawYamlData'], $allTechnologiesRawData['main']);
        $otherTechnologies = array_map([$this, 'getTechnologyFromRawYamlData'], $allTechnologiesRawData['others']);

        return new Technologies(
            $mainTechnologies,
            $otherTechnologies
        );
    }

    /**
     * @param array $yamlData
     *
     * @return Technology
     */
    private function getTechnologyFromRawYamlData(array $yamlData)
    {
        return new Technology(
            $yamlData['title'],
            $yamlData['icon'],
            isset($yamlData['url']) ? $yamlData['url'] : null,
            isset($yamlData['contributor-url']) ? $yamlData['contributor-url'] : null
        );
    }
}
