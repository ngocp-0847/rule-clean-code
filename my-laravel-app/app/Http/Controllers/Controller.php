<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

# This is a hash comment that should trigger the sniff
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
