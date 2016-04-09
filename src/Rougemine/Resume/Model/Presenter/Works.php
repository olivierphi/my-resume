<?php

namespace Rougemine\Resume\Model\Presenter;

use Rougemine\Resume\Model\ValueObject\Work;

class Works
{
    /**
     * @var Work[]
     */
    private $works;

    /**
     * @param Work[] $works
     */
    public function __construct(
        $works
    ) {
        $this->works = $works;
    }

    /**
     * @return Work[]
     */
    public function getWorks()
    {
        return $this->works;
    }
}
