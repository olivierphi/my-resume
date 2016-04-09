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
     * @var \DateTimeImmutable
     */
    private $birthDate;
    /**
     * @var string
     */
    private $jobTitle;
    /**
     * @var string
     */
    private $address;
    /**
     * @var string
     */
    private $email;
    /**
     * @var string
     */
    private $phoneNumber;
    /**
     * @var string
     */
    private $twitterId;

    /**
     * @param string $name
     * @param \DateTimeImmutable $birthDate
     * @param string $jobTitle
     * @param string $address
     * @param string $email
     * @param string $phoneNumber
     * @param string $url
     * @param string $url
     * @param string $githubId
     */
    public function __construct(
        $name,
        \DateTimeImmutable $birthDate,
        $jobTitle,
        $address,
        $email,
        $phoneNumber,
        $url,
        $twitterId,
        $githubId
    ) {
        $this->name = $name;
        $this->birthDate = $birthDate;
        $this->jobTitle = $jobTitle;
        $this->address = $address;
        $this->email = $email;
        $this->phoneNumber = $phoneNumber;
        $this->url = $url;
        $this->twitterId = $twitterId;
        $this->githubId = $githubId;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * @return string
     */
    public function getJobTitle()
    {
        return $this->jobTitle;
    }

    /**
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPhoneNumber()
    {
        return $this->phoneNumber;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @return string
     */
    public function getTwitterId()
    {
        return $this->twitterId;
    }

    /**
     * @return string
     */
    public function getGithubId()
    {
        return $this->githubId;
    }
}
