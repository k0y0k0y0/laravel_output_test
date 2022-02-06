@extends('layouts.app')

@section('content')
  <div id="example"  data-title="{{__('Practice').'「'.$drill->title.'」'}}" data-drill="{{$drill}}" data-category-name="{{$drill->category_name}}"></div>
@endsection