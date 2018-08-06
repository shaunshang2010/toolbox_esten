# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'toolbox_esten/version'

Gem::Specification.new do |spec|
  spec.name          = "toolbox_esten"
  spec.version       = ToolboxEsten::VERSION
  spec.platform      = Gem::Platform::RUBY
  spec.authors       = ["Shang Chuan Chuan"]
  spec.email         = ["shaunshang2010@hotmail.com"]
  spec.license       = "MIT"
  spec.homepage      = "https://github.com/shaunshang2010/toolbox_esten"
  spec.summary       = "A simple Sass tool for Esten web apps"
  spec.description   = ""

  spec.rubyforge_project = "toolbox_esten"

  spec.files         = `git ls-files`.split("\n")
  spec.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  spec.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency('sass')
  spec.add_dependency('thor')
  
  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "railties", '~> 5.2'
  spec.add_development_dependency('aruba', '~> 0.4')

  # Dummy Rails app dependencies
  spec.add_development_dependency 'actionpack', '~> 5.2'
  spec.add_development_dependency 'activesupport', '>= 4.1.5'
  spec.add_development_dependency 'json', '>= 1.8.1'
  spec.add_development_dependency 'sprockets-rails', '~> 3.2', '>= 3.2.1'
  spec.add_development_dependency 'jquery-rails', '>= 3.1.0'
  spec.add_development_dependency 'slim-rails', '~> 3.1', '>= 3.1.3'
  spec.add_development_dependency 'uglifier', '~> 4.1', '>= 4.1.12'
  # Converter
  spec.add_development_dependency 'term-ansicolor', '~> 1.6'
end

