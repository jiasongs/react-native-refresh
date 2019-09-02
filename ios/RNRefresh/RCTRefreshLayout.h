//
//  RCTRefreshHeader.h
//  RNTemplate
//
//  Created by RuanMei on 2019/8/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <MJRefresh/MJRefresh.h>
#import <React/RCTConvert.h>
#import <React/RCTComponent.h>
#import <React/RCTScrollableProtocol.h>

@interface RCTRefreshLayout : MJRefreshHeader<RCTCustomRefreshContolProtocol>

@property (nonatomic, copy) RCTDirectEventBlock onRefresh;
@property (nonatomic, copy) RCTDirectEventBlock onChangeState;
@property (nonatomic, copy) RCTDirectEventBlock onChangeOffset;

@end


