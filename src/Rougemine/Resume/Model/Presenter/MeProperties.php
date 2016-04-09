<?php

namespace Rougemine\Resume\Model\Presenter;

/**
 * Yup, as a human being I do have some "properties".
 */
class MeProperties
{
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $birthDate;
    /**
     * @var string
     */
    private $address;

    /**
     * @param string $name
     * @param string $birthDate
     * @param string $address
     */
    public function __construct($name, $birthDate, $address)
    {
        $this->name = $name;
        $this->birthDate = $birthDate;
        $this->address = $address;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }
}
