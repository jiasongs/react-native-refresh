/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTRefreshLayoutManager.h"
#import "RCTRefreshLayout.h"

@implementation RCTRefreshLayoutManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[RCTRefreshLayout alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeState, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeOffset, RCTDirectEventBlock)


@end
