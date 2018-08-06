# coding: utf-8
# Based on convert script from vwall/compass-twitter-bootstrap gem.
# https://github.com/vwall/compass-twitter-bootstrap/blob/master/build/convert.rb
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this work except in compliance with the License.
# You may obtain a copy of the License in the LICENSE file, or at:
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require 'open-uri'
require 'json'
require 'strscan'
require 'forwardable'
require 'term/ansicolor'
require 'fileutils'

require_relative 'converter/logger'
require_relative 'converter/network'

class Converter
  extend Forwardable
  include Network

  def initialize(repo: 'twbs/toolbox_esten', branch: 'master', save_to: {}, cache_path: 'tmp/converter-cache-toolbox_esten')
    @logger     = Logger.new
    @repo       = repo
    @branch     = branch || 'master'
    @branch_sha = get_branch_sha
    @cache_path = cache_path
    # @repo_url   = "https://github.com/#@repo"
    @repo_url   = ""
    @save_to    = {scss:  'assets/stylesheets/toolbox_esten'}.merge(save_to)
  end

  def_delegators :@logger, :log, :log_status, :log_processing, :log_transform, :log_file_info, :log_processed, :log_http_get_file, :log_http_get_files, :silence_log

  def process_toolbox_esten
    log_status "Convert toolbox_esten LESS to Sass"
    puts " repo   : #@repo_url"
    puts " branch : #@branch_sha #@repo_url/tree/#@branch"
    puts " save to: #{@save_to.to_json}"
    puts " twbs cache: #{@cache_path}"
    puts '-' * 60

    @save_to.each { |_, v| FileUtils.mkdir_p(v) }

    process_stylesheet_assets
  end

  def save_file(path, content, mode='w')
    dir = File.dirname(path)
    FileUtils.mkdir_p(dir) unless File.directory?(dir)
    File.open(path, mode) { |file| file.write(content) }
  end
end
