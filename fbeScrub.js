// Copyright 2013 John Felleman

/************************************************************************
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

************************************************************************/

XMLHttpRequest.prototype.open = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  fbe.s_ajaxListener.tempOpen.apply(this, arguments);
  fbe.s_ajaxListener.method = a;  
  fbe.s_ajaxListener.url = b;
  if (a.toLowerCase() == 'get') {
    fbe.s_ajaxListener.data = b.split('?');
    fbe.s_ajaxListener.data = fbe.s_ajaxListener.data[1];
  }
}

XMLHttpRequest.prototype.send = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  fbe.s_ajaxListener.tempSend.apply(this, arguments);
  if (fbe.s_ajaxListener.method.toLowerCase() == 'post') {
    fbe.s_ajaxListener.data = a;
  }
  fbe.s_ajaxListener.callback();
}
  
var fbe = {
  scrub: function() {
    $('#pagelet_side_ads').html('');
    $('#pagelet_ego_pane').html('');
  },

  // placeholder in case there is a reason to use the callback arguments
  callScrub: function(method, url, data) {
    this.scrub();
  },

  s_ajaxListener: {
  tempOpen: XMLHttpRequest.prototype.open,
  tempSend: XMLHttpRequest.prototype.send,
  callback: this.callScrub
  }
}

$(document).ready(function() {
  fbe.scrub();
});
